"""
FastAPI Backend para Orbee Labs
APIs para processamento pesado: SEO Analysis, ROI Calculation, Content Generation
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List, Dict, Any
import os
from dotenv import load_dotenv
import logging

# Carregar variáveis de ambiente
load_dotenv()

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Criar aplicação FastAPI
app = FastAPI(
    title="Orbee Labs API",
    description="Backend API para processamento pesado de análises SEO, cálculos ROI e geração de conteúdo",
    version="1.0.0",
)

# Configurar CORS
origins = [
    os.getenv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
    "http://localhost:3000",
    "https://orbeelabs.com",
    "https://www.orbeelabs.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret para autenticação entre serviços
API_SECRET = os.getenv("FASTAPI_SECRET")

# Validar que o secret está configurado em produção
if not API_SECRET:
    if os.getenv("ENVIRONMENT") == "production":
        raise ValueError("FASTAPI_SECRET deve ser configurado em produção!")
    # Em desenvolvimento, usar um secret padrão (mas avisar)
    API_SECRET = "change-me-in-production"
    print("⚠️ AVISO: FASTAPI_SECRET não configurado. Usando secret padrão (NÃO SEGURO PARA PRODUÇÃO!)")


# Models
class SEOAnalysisRequest(BaseModel):
    url: HttpUrl = Field(..., description="URL para análise SEO")
    include_technical: bool = Field(True, description="Incluir análise técnica")
    include_content: bool = Field(True, description="Incluir análise de conteúdo")
    include_performance: bool = Field(True, description="Incluir análise de performance")


class ROIRequest(BaseModel):
    investimento_inicial: float = Field(..., description="Investimento inicial", gt=0)
    investimento_mensal: float = Field(0, description="Investimento mensal recorrente", ge=0)
    receita_mensal: float = Field(..., description="Receita mensal esperada", ge=0)
    custo_operacional: float = Field(0, description="Custo operacional mensal", ge=0)
    periodo_meses: int = Field(12, description="Período de análise em meses", ge=1, le=60)
    taxa_desconto: float = Field(0.1, description="Taxa de desconto (padrão 10%)", ge=0, le=1)


class ContentGenerationRequest(BaseModel):
    topic: str = Field(..., description="Tópico do conteúdo", min_length=5, max_length=200)
    content_type: str = Field("blog_post", description="Tipo de conteúdo: blog_post, email, social_media")
    tone: str = Field("professional", description="Tom: professional, casual, friendly")
    length: str = Field("medium", description="Tamanho: short, medium, long")
    keywords: Optional[List[str]] = Field(None, description="Palavras-chave a incluir")
    target_audience: Optional[str] = Field(None, description="Público-alvo")


# Dependência para autenticação
async def verify_api_secret(x_api_secret: Optional[str] = Header(None)):
    """Verificar secret da API"""
    if not x_api_secret or x_api_secret != API_SECRET:
        raise HTTPException(status_code=401, detail="API Secret inválido")
    return x_api_secret


# Health Check
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "orbee-labs-api"}


# SEO Analysis Endpoint
@app.post("/api/v1/analyze-seo")
async def analyze_seo(
    request: SEOAnalysisRequest,
    api_secret: str = Depends(verify_api_secret)
):
    """
    Análise SEO avançada de uma URL
    
    Esta API realiza uma análise completa de SEO, incluindo:
    - Análise técnica (meta tags, headers, estrutura HTML)
    - Análise de conteúdo (keywords, headings, alt texts)
    - Análise de performance (Core Web Vitals, velocidade)
    """
    try:
        from services.seo_analyzer import analyze_url
        
        logger.info(f"Iniciando análise SEO para: {request.url}")
        result = await analyze_url(
            str(request.url),
            include_technical=request.include_technical,
            include_content=request.include_content,
            include_performance=request.include_performance,
        )
        
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"Erro na análise SEO: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao analisar URL: {str(e)}")


# ROI Calculation Endpoint
@app.post("/api/v1/calculate-roi")
async def calculate_roi(
    request: ROIRequest,
    api_secret: str = Depends(verify_api_secret)
):
    """
    Cálculo avançado de ROI
    
    Calcula o ROI considerando:
    - Investimento inicial e recorrente
    - Receita e custos operacionais
    - Taxa de desconto (NPV)
    - Período de análise customizável
    """
    try:
        from services.roi_calculator import calculate_advanced_roi
        
        logger.info(f"Calculando ROI para período de {request.periodo_meses} meses")
        result = await calculate_advanced_roi(
            investimento_inicial=request.investimento_inicial,
            investimento_mensal=request.investimento_mensal,
            receita_mensal=request.receita_mensal,
            custo_operacional=request.custo_operacional,
            periodo_meses=request.periodo_meses,
            taxa_desconto=request.taxa_desconto,
        )
        
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"Erro no cálculo ROI: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao calcular ROI: {str(e)}")


# Content Generation Endpoint
@app.post("/api/v1/generate-content")
async def generate_content(
    request: ContentGenerationRequest,
    api_secret: str = Depends(verify_api_secret)
):
    """
    Geração de conteúdo com IA
    
    Gera conteúdo otimizado para SEO baseado em:
    - Tópico fornecido
    - Tipo de conteúdo (blog post, email, social media)
    - Tom e público-alvo
    - Palavras-chave
    """
    try:
        from services.content_generator import generate_content
        
        logger.info(f"Gerando conteúdo do tipo: {request.content_type}")
        result = await generate_content(
            topic=request.topic,
            content_type=request.content_type,
            tone=request.tone,
            length=request.length,
            keywords=request.keywords or [],
            target_audience=request.target_audience,
        )
        
        return JSONResponse(content=result)
    except Exception as e:
        logger.error(f"Erro na geração de conteúdo: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao gerar conteúdo: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

