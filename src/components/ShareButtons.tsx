'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  platform?: 'all' | 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email';
}

export default function ShareButtons({
  url,
  title = 'Orbee Labs - Marketing Digital e Desenvolvimento Web',
  description = 'Agência de marketing digital especializada em SEO técnico e desenvolvimento web fullstack.',
  image,
  className = '',
  variant = 'outline',
  size = 'md',
  showLabels = false,
  platform = 'all'
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  // Obter URL atual se não fornecida
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = encodeURIComponent(title);
  // shareDescription e shareImage podem ser usados no futuro para Open Graph
  // const shareDescription = encodeURIComponent(description);
  // const shareImage = image || 'https://orbeelabs.com/og-image.jpg';

  // Função para rastrear compartilhamentos
  const trackShare = (platform: string) => {
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as { dataLayer?: Array<Record<string, unknown>> }).dataLayer?.push({
        event: 'share',
        platform: platform,
        page_url: shareUrl,
        page_title: title,
      });
    }
  };

  // Compartilhar no Facebook
  const shareFacebook = () => {
    trackShare('facebook');
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Compartilhar no Twitter/X
  const shareTwitter = () => {
    trackShare('twitter');
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Compartilhar no LinkedIn
  const shareLinkedIn = () => {
    trackShare('linkedin');
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  // Compartilhar no WhatsApp
  const shareWhatsApp = () => {
    trackShare('whatsapp');
    const whatsappUrl = `https://wa.me/?text=${shareTitle}%20${encodeURIComponent(shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Compartilhar por Email
  const shareEmail = () => {
    trackShare('email');
    const emailSubject = encodeURIComponent(title);
    const emailBody = encodeURIComponent(`${description}\n\n${shareUrl}`);
    const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = emailUrl;
  };

  // Copiar link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShare('copy');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  // Compartilhamento nativo (se disponível)
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
        trackShare('native');
      } catch (err) {
        // Usuário cancelou ou erro
        console.log('Compartilhamento cancelado');
      }
    } else {
      // Fallback para copiar link
      copyLink();
    }
  };

  const buttonSize = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const renderButton = (
    onClick: () => void,
    icon: React.ReactNode,
    label: string,
    show: boolean = true
  ) => {
    if (!show) return null;

    return (
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        className={`${buttonSize[size]} ${showLabels ? 'gap-2' : ''}`}
      >
        <span className={iconSize[size]}>{icon}</span>
        {showLabels && <span>{label}</span>}
      </Button>
    );
  };

  const showAll = platform === 'all';
  const showFacebook = showAll || platform === 'facebook';
  const showTwitter = showAll || platform === 'twitter';
  const showLinkedIn = showAll || platform === 'linkedin';
  const showWhatsApp = showAll || platform === 'whatsapp';
  const showEmail = showAll || platform === 'email';

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {renderButton(
        shareFacebook,
        <Facebook className={iconSize[size]} />,
        'Facebook',
        showFacebook
      )}
      
      {renderButton(
        shareTwitter,
        <Twitter className={iconSize[size]} />,
        'Twitter',
        showTwitter
      )}
      
      {renderButton(
        shareLinkedIn,
        <Linkedin className={iconSize[size]} />,
        'LinkedIn',
        showLinkedIn
      )}
      
      {renderButton(
        shareWhatsApp,
        <MessageCircle className={iconSize[size]} />,
        'WhatsApp',
        showWhatsApp
      )}
      
      {renderButton(
        shareEmail,
        <Mail className={iconSize[size]} />,
        'Email',
        showEmail
      )}

      {/* Compartilhamento nativo ou copiar link */}
      {showAll && (
        <Button
          onClick={navigator.share ? shareNative : copyLink}
          variant={variant}
          size={size}
          className={`${buttonSize[size]} ${showLabels ? 'gap-2' : ''}`}
        >
          {copied ? (
            <>
              <Check className={iconSize[size]} />
              {showLabels && <span>Copiado!</span>}
            </>
          ) : (
            <>
              {navigator.share ? (
                <>
                  <Share2 className={iconSize[size]} />
                  {showLabels && <span>Compartilhar</span>}
                </>
              ) : (
                <>
                  <Copy className={iconSize[size]} />
                  {showLabels && <span>Copiar Link</span>}
                </>
              )}
            </>
          )}
        </Button>
      )}
    </div>
  );
}

