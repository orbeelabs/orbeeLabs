import type { CRMAdapter, CRMProvider } from './types';
// import { HubSpotAdapter } from './hubspot'; // Temporariamente desabilitado
import { PipedriveAdapter } from './pipedrive';
import { RDStationAdapter } from './rdstation';

// Adapter vazio para quando não há CRM configurado
class NoCRMAdapter implements CRMAdapter {
  async createContact(): Promise<{ success: boolean }> {
    return { success: false };
  }
}

export function createCRMAdapter(): CRMAdapter {
  const provider = (process.env.CRM_PROVIDER || 'none').toLowerCase() as CRMProvider;

  switch (provider) {
    // HubSpot temporariamente desabilitado
    // case 'hubspot': {
    //   const apiKey = process.env.HUBSPOT_API_KEY;
    //   if (!apiKey) {
    //     console.warn('HUBSPOT_API_KEY não configurada. CRM desabilitado.');
    //     return new NoCRMAdapter();
    //   }
    //   return new HubSpotAdapter(apiKey);
    // }

    case 'pipedrive': {
      const apiToken = process.env.PIPEDRIVE_API_TOKEN;
      if (!apiToken) {
        // Logger.warn('PIPEDRIVE_API_TOKEN não configurada. CRM desabilitado.');
        return new NoCRMAdapter();
      }
      return new PipedriveAdapter(apiToken);
    }

    case 'rdstation': {
      const publicToken = process.env.RDSTATION_PUBLIC_TOKEN;
      const privateToken = process.env.RDSTATION_PRIVATE_TOKEN;
      if (!publicToken || !privateToken) {
        // Logger.warn('RDSTATION_PUBLIC_TOKEN ou RDSTATION_PRIVATE_TOKEN não configuradas. CRM desabilitado.');
        return new NoCRMAdapter();
      }
      return new RDStationAdapter(publicToken, privateToken);
    }

    case 'none':
    default:
      return new NoCRMAdapter();
  }
}

// Singleton para reutilizar a instância
let crmAdapterInstance: CRMAdapter | null = null;

export function getCRMAdapter(): CRMAdapter {
  if (!crmAdapterInstance) {
    crmAdapterInstance = createCRMAdapter();
  }
  return crmAdapterInstance;
}

