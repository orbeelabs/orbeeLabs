# Script para configurar Prisma com .env.local
# Carrega variáveis do .env.local e executa comandos do Prisma

# Ler o arquivo .env.local
if (Test-Path .env.local) {
    Get-Content .env.local | ForEach-Object {
        if ($_ -match '^([^#][^=]*)\s*=\s*(.+)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            # Remover aspas se houver
            if ($value.StartsWith('"') -and $value.EndsWith('"')) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
    Write-Host "Variáveis de ambiente carregadas do .env.local"
} else {
    Write-Host "Arquivo .env.local não encontrado!"
    exit 1
}

# Executar comando do Prisma
Write-Host ""
Write-Host "Executando: prisma db push"
npx prisma db push

