"""
Serviço de geração de conteúdo com IA
"""

from typing import Dict, Any, Optional, List
import logging
import os

logger = logging.getLogger(__name__)

# OpenAI API Key (opcional)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


async def generate_content(
    topic: str,
    content_type: str = "blog_post",
    tone: str = "professional",
    length: str = "medium",
    keywords: Optional[List[str]] = None,
    target_audience: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Gera conteúdo otimizado para SEO usando IA
    """
    try:
        # Se OpenAI não estiver configurado, retornar template
        if not OPENAI_API_KEY:
            logger.warning("OpenAI API Key não configurada. Retornando template.")
            return generate_template_content(
                topic, content_type, tone, length, keywords, target_audience
            )
        
        # Usar OpenAI para gerar conteúdo real
        from openai import AsyncOpenAI
        
        client = AsyncOpenAI(api_key=OPENAI_API_KEY)
        
        # Construir prompt
        prompt = build_prompt(topic, content_type, tone, length, keywords, target_audience)
        
        # Gerar conteúdo
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "Você é um especialista em marketing digital e SEO. Crie conteúdo otimizado, envolvente e profissional.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.7,
            max_tokens=2000 if length == "long" else 1000 if length == "medium" else 500,
        )
        
        content = response.choices[0].message.content
        
        return {
            "content": content,
            "topic": topic,
            "content_type": content_type,
            "tone": tone,
            "length": length,
            "keywords": keywords or [],
            "word_count": len(content.split()),
            "generated_with_ai": True,
        }
        
    except Exception as e:
        logger.error(f"Erro na geração de conteúdo: {str(e)}")
        # Fallback para template
        return generate_template_content(
            topic, content_type, tone, length, keywords, target_audience
        )


def build_prompt(
    topic: str,
    content_type: str,
    tone: str,
    length: str,
    keywords: Optional[List[str]],
    target_audience: Optional[str],
) -> str:
    """Constrói o prompt para geração de conteúdo"""
    prompt_parts = [
        f"Crie um {content_type} sobre: {topic}",
    ]
    
    if target_audience:
        prompt_parts.append(f"Público-alvo: {target_audience}")
    
    if keywords:
        prompt_parts.append(f"Inclua estas palavras-chave naturalmente: {', '.join(keywords)}")
    
    prompt_parts.append(f"Tom: {tone}")
    prompt_parts.append(f"Tamanho: {length}")
    
    prompt_parts.append(
        "O conteúdo deve ser:"
        "- Otimizado para SEO"
        "- Engajador e informativo"
        "- Bem estruturado com headings"
        "- Incluir call-to-action quando apropriado"
    )
    
    return "\n".join(prompt_parts)


def generate_template_content(
    topic: str,
    content_type: str,
    tone: str,
    length: str,
    keywords: Optional[List[str]],
    target_audience: Optional[str],
) -> Dict[str, Any]:
    """Gera conteúdo template quando IA não está disponível"""
    word_count = {
        "short": 300,
        "medium": 800,
        "long": 1500,
    }.get(length, 800)
    
    template = f"""
# {topic}

## Introdução

Este artigo explora {topic.lower()} e como isso pode impactar seu negócio.

{f"Público-alvo: {target_audience}" if target_audience else ""}

## Principais Pontos

1. **Primeiro ponto importante**
   - Detalhes e explicações
   - Exemplos práticos

2. **Segundo ponto importante**
   - Análise detalhada
   - Casos de uso

3. **Terceiro ponto importante**
   - Melhores práticas
   - Recomendações

## Conclusão

{topic} é um tema importante que merece atenção. Implemente as estratégias discutidas para obter melhores resultados.

{f"Palavras-chave: {', '.join(keywords) if keywords else 'N/A'}"}
"""
    
    return {
        "content": template.strip(),
        "topic": topic,
        "content_type": content_type,
        "tone": tone,
        "length": length,
        "keywords": keywords or [],
        "word_count": len(template.split()),
        "generated_with_ai": False,
        "note": "Conteúdo gerado via template. Configure OPENAI_API_KEY para usar IA.",
    }

