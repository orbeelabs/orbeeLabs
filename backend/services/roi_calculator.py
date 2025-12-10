"""
Serviço de cálculo avançado de ROI
"""

from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)


async def calculate_advanced_roi(
    investimento_inicial: float,
    investimento_mensal: float,
    receita_mensal: float,
    custo_operacional: float,
    periodo_meses: int,
    taxa_desconto: float = 0.1,
) -> Dict[str, Any]:
    """
    Calcula ROI avançado com NPV (Net Present Value)
    """
    try:
        # Calcular fluxo de caixa mensal
        fluxo_caixa_mensal = receita_mensal - custo_operacional - investimento_mensal
        
        # Calcular investimento total
        investimento_total = investimento_inicial + (investimento_mensal * periodo_meses)
        
        # Calcular receita total
        receita_total = receita_mensal * periodo_meses
        
        # Calcular custo total
        custo_total = investimento_total + (custo_operacional * periodo_meses)
        
        # Calcular lucro total
        lucro_total = receita_total - custo_total
        
        # Calcular ROI simples
        roi_percentual = (lucro_total / investimento_total) * 100 if investimento_total > 0 else 0
        
        # Calcular NPV (Net Present Value)
        npv = -investimento_inicial
        taxa_mensal = taxa_desconto / 12
        
        for mes in range(1, periodo_meses + 1):
            valor_presente = fluxo_caixa_mensal / ((1 + taxa_mensal) ** mes)
            npv += valor_presente
        
        # Calcular payback period
        acumulado = -investimento_inicial
        payback_meses = None
        for mes in range(1, periodo_meses + 1):
            acumulado += fluxo_caixa_mensal
            if acumulado >= 0 and payback_meses is None:
                payback_meses = mes
        
        # Calcular break-even point
        if fluxo_caixa_mensal > 0:
            break_even_meses = investimento_inicial / fluxo_caixa_mensal
        else:
            break_even_meses = None
        
        # Projeção mensal
        projecao_mensal: List[Dict[str, Any]] = []
        acumulado_investimento = investimento_inicial
        
        for mes in range(1, periodo_meses + 1):
            acumulado_investimento += investimento_mensal
            receita_acumulada = receita_mensal * mes
            custo_acumulado = acumulado_investimento + (custo_operacional * mes)
            lucro_acumulado = receita_acumulada - custo_acumulado
            roi_mensal = (lucro_acumulado / acumulado_investimento) * 100 if acumulado_investimento > 0 else 0
            
            projecao_mensal.append({
                "mes": mes,
                "investimento_acumulado": round(acumulado_investimento, 2),
                "receita_acumulada": round(receita_acumulada, 2),
                "custo_acumulado": round(custo_acumulado, 2),
                "lucro_acumulado": round(lucro_acumulado, 2),
                "roi_percentual": round(roi_mensal, 2),
            })
        
        return {
            "investimento_inicial": round(investimento_inicial, 2),
            "investimento_total": round(investimento_total, 2),
            "receita_total": round(receita_total, 2),
            "custo_total": round(custo_total, 2),
            "lucro_total": round(lucro_total, 2),
            "roi_percentual": round(roi_percentual, 2),
            "npv": round(npv, 2),
            "payback_meses": payback_meses,
            "break_even_meses": round(break_even_meses, 2) if break_even_meses else None,
            "periodo_meses": periodo_meses,
            "projecao_mensal": projecao_mensal,
        }
        
    except Exception as e:
        logger.error(f"Erro no cálculo ROI: {str(e)}")
        raise


