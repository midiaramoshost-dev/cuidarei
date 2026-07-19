import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import NewStatsSection from "@/components/NewStatsSection";
import TrustBadges from "@/components/TrustBadges";
import NewFeaturesSection from "@/components/NewFeaturesSection";
import TechnologySection from "@/components/TechnologySection";
import NewTestimonialsSection from "@/components/NewTestimonialsSection";
import PricingSection from "@/components/PricingSection";
import NewCTASection from "@/components/NewCTASection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cuidadores de Idosos em Sorocaba/SP | Cuidarei</title>
        <meta name="description" content="Cuidadores de idosos, home care e casas de repouso em Sorocaba e região. Cuidado com idosos com tecnologia, segurança e carinho para a sua família." />
        <meta name="keywords" content="cuidador de idosos Sorocaba, cuidado com idosos, casa de repouso Sorocaba, home care Sorocaba, cuidador domiciliar Sorocaba, cuidadora de idosos, agência de cuidadores" />
        <link rel="canonical" href="https://cuidarei.lovable.app/" />
        <meta property="og:title" content="Cuidadores de Idosos em Sorocaba/SP | Cuidarei" />
        <meta property="og:url" content="https://cuidarei.lovable.app/" />
        <meta property="og:description" content="Cuidadores, home care e casas de repouso em Sorocaba e região. Tecnologia, segurança e carinho." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Vocês atendem em Sorocaba?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Sorocaba é nossa cidade-sede, e atendemos toda a região: Votorantim, Itu, Salto, Itapetininga, São Roque, Mairinque, Boituva, Tatuí e Piedade." } },
            { "@type": "Question", "name": "Quanto custa um cuidador de idosos em Sorocaba?", "acceptedAnswer": { "@type": "Answer", "text": "Os planos variam conforme carga horária e tipo de cuidado. Consulte os planos na página inicial para valores atualizados." } },
            { "@type": "Question", "name": "Como contratar home care em Sorocaba?", "acceptedAnswer": { "@type": "Answer", "text": "Cadastre-se na plataforma, escolha o cuidador e o plano adequado. Toda a contratação é digital, segura e com acompanhamento da família." } },
            { "@type": "Question", "name": "Vocês indicam casas de repouso em Sorocaba?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Trabalhamos com instituições parceiras em Sorocaba e região para famílias que buscam residência de longa permanência." } },
            { "@type": "Question", "name": "Como me candidatar a vagas de cuidador?", "acceptedAnswer": { "@type": "Answer", "text": "Acesse a página Trabalhe Conosco para se cadastrar como cuidador e receber oportunidades em Sorocaba e região." } }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Cuidador de idosos e home care",
          "provider": { "@type": "LocalBusiness", "name": "Cuidarei", "@id": "https://cuidarei.lovable.app/#business" },
          "areaServed": [
            { "@type": "City", "name": "Sorocaba" },
            { "@type": "City", "name": "Votorantim" },
            { "@type": "City", "name": "Itu" },
            { "@type": "City", "name": "Salto" },
            { "@type": "City", "name": "Itapetininga" },
            { "@type": "City", "name": "São Roque" },
            { "@type": "City", "name": "Mairinque" },
            { "@type": "City", "name": "Boituva" },
            { "@type": "City", "name": "Tatuí" }
          ],
          "audience": { "@type": "PeopleAudience", "suggestedMinAge": 60 }
        })}</script>
      </Helmet>
      <Header />
      <main>
        <HeroSlideshow />
        <NewStatsSection />
        <TrustBadges />
        <NewFeaturesSection />
        <TechnologySection />
        <NewTestimonialsSection />
        <PricingSection />
        <DonationSection />
        <NewCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
