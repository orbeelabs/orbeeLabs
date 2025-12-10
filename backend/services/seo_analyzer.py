"""
Serviço de análise SEO avançada
"""

import httpx
from bs4 import BeautifulSoup
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)


async def analyze_url(
    url: str,
    include_technical: bool = True,
    include_content: bool = True,
    include_performance: bool = True,
) -> Dict[str, Any]:
    """
    Analisa uma URL e retorna métricas SEO completas
    """
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(url, follow_redirects=True)
            response.raise_for_status()
            
            html = response.text
            soup = BeautifulSoup(html, 'lxml')
            
            result: Dict[str, Any] = {
                "url": str(response.url),
                "status_code": response.status_code,
                "overall_score": 0,
                "categories": {},
            }
            
            # Análise técnica
            if include_technical:
                technical_score = await analyze_technical_seo(soup, url)
                result["categories"]["technical"] = technical_score
                result["overall_score"] += technical_score.get("score", 0) * 0.4
            
            # Análise de conteúdo
            if include_content:
                content_score = await analyze_content_seo(soup)
                result["categories"]["content"] = content_score
                result["overall_score"] += content_score.get("score", 0) * 0.4
            
            # Análise de performance
            if include_performance:
                performance_score = await analyze_performance(url, response)
                result["categories"]["performance"] = performance_score
                result["overall_score"] += performance_score.get("score", 0) * 0.2
            
            # Normalizar score (0-100)
            result["overall_score"] = min(100, max(0, int(result["overall_score"])))
            
            return result
            
    except httpx.HTTPError as e:
        logger.error(f"Erro HTTP ao acessar URL: {str(e)}")
        raise Exception(f"Erro ao acessar URL: {str(e)}")
    except Exception as e:
        logger.error(f"Erro inesperado na análise SEO: {str(e)}")
        raise


async def analyze_technical_seo(soup: BeautifulSoup, url: str) -> Dict[str, Any]:
    """Análise técnica de SEO"""
    score = 0
    issues: List[str] = []
    recommendations: List[str] = []
    
    # Meta tags
    title = soup.find("title")
    if title and title.text.strip():
        title_text = title.text.strip()
        if 30 <= len(title_text) <= 60:
            score += 10
        else:
            issues.append(f"Título deve ter entre 30-60 caracteres (atual: {len(title_text)})")
    else:
        issues.append("Título não encontrado")
    
    meta_description = soup.find("meta", attrs={"name": "description"})
    if meta_description and meta_description.get("content"):
        desc = meta_description.get("content", "").strip()
        if 120 <= len(desc) <= 160:
            score += 10
        else:
            issues.append(f"Meta description deve ter entre 120-160 caracteres (atual: {len(desc)})")
    else:
        issues.append("Meta description não encontrada")
    
    # Headers
    h1_tags = soup.find_all("h1")
    if len(h1_tags) == 1:
        score += 10
    elif len(h1_tags) == 0:
        issues.append("Nenhuma tag H1 encontrada")
    else:
        issues.append(f"Múltiplas tags H1 encontradas ({len(h1_tags)})")
    
    # Canonical
    canonical = soup.find("link", attrs={"rel": "canonical"})
    if canonical:
        score += 5
    else:
        recommendations.append("Adicionar tag canonical")
    
    # Open Graph
    og_tags = soup.find_all("meta", attrs={"property": lambda x: x and x.startswith("og:")})
    if len(og_tags) >= 4:
        score += 10
    else:
        recommendations.append("Adicionar mais tags Open Graph")
    
    # Schema.org
    schema_tags = soup.find_all("script", attrs={"type": "application/ld+json"})
    if schema_tags:
        score += 5
    else:
        recommendations.append("Adicionar Schema.org structured data")
    
    # Alt texts em imagens
    images = soup.find_all("img")
    images_with_alt = [img for img in images if img.get("alt")]
    if images:
        alt_percentage = (len(images_with_alt) / len(images)) * 100
        if alt_percentage >= 90:
            score += 10
        else:
            issues.append(f"Apenas {alt_percentage:.0f}% das imagens têm alt text")
    
    return {
        "score": min(100, score),
        "issues": issues,
        "recommendations": recommendations,
    }


async def analyze_content_seo(soup: BeautifulSoup) -> Dict[str, Any]:
    """Análise de conteúdo SEO"""
    score = 0
    issues: List[str] = []
    
    # Texto do conteúdo
    body = soup.find("body")
    if body:
        text = body.get_text(strip=True)
        word_count = len(text.split())
        
        if word_count >= 300:
            score += 20
        elif word_count >= 200:
            score += 10
        else:
            issues.append(f"Conteúdo muito curto ({word_count} palavras). Recomendado: 300+")
    
    # Headings hierarchy
    headings = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
    if len(headings) >= 3:
        score += 10
    else:
        issues.append("Poucos headings. Use H2, H3 para estrutura")
    
    # Links internos
    links = soup.find_all("a", href=True)
    internal_links = [link for link in links if link.get("href", "").startswith("/")]
    if len(internal_links) >= 3:
        score += 10
    else:
        issues.append("Adicionar mais links internos")
    
    return {
        "score": min(100, score),
        "issues": issues,
    }


async def analyze_performance(url: str, response: httpx.Response) -> Dict[str, Any]:
    """Análise de performance"""
    score = 50  # Score base
    issues: List[str] = []
    
    # Tamanho da resposta
    content_length = len(response.content)
    if content_length < 100000:  # < 100KB
        score += 20
    elif content_length < 500000:  # < 500KB
        score += 10
    else:
        issues.append(f"Página muito pesada ({content_length / 1024:.0f}KB). Otimizar")
    
    # Headers de cache
    cache_headers = ["cache-control", "expires", "etag"]
    has_cache = any(header in response.headers for header in cache_headers)
    if has_cache:
        score += 10
    else:
        issues.append("Configurar headers de cache")
    
    # Compressão
    if "gzip" in response.headers.get("content-encoding", "").lower():
        score += 10
    else:
        issues.append("Habilitar compressão GZIP")
    
    return {
        "score": min(100, score),
        "issues": issues,
    }

