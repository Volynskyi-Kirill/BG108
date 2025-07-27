import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  const featuresGuide: { title: string; description: string }[] =
    t.raw('featuresGuide');

  return (
    <div className='max-w-2xl mx-auto py-8 space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4 text-muted-foreground'>{t('description')}</p>
          <section className='mb-6'>
            <h2 className='font-semibold mb-2'>{t('featuresTitle')}</h2>
            <Accordion type='single' collapsible className='w-full'>
              {featuresGuide.map((feature) => (
                <AccordionItem value={feature.title} key={feature.title}>
                  <AccordionTrigger>{feature.title}</AccordionTrigger>
                  <AccordionContent>{feature.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
