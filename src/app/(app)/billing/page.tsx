import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals getting started.',
    features: [
      '1 connected account',
      'Up to 100 searches/month',
      'Basic AI summarization',
    ],
    isCurrent: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$15',
    period: '/ month',
    description: 'For power users and professionals.',
    features: [
      'Up to 5 connected accounts',
      'Unlimited searches',
      'Advanced AI summarization',
      'Attachment content search',
    ],
    isCurrent: true,
    cta: 'You are on this plan',
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For teams and organizations.',
    features: [
      'Unlimited accounts & users',
      'Team-level security & SSO',
      'Dedicated support',
      'Custom integrations',
    ],
    isCurrent: false,
    cta: 'Contact Sales',
  },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Find the plan that’s right for you
        </h1>
        <p className="mx-auto max-w-lg text-muted-foreground md:text-xl">
          Unlock more features and power up your search capabilities.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`bg-mica flex flex-col transition-all duration-300 ${
              plan.isCurrent ? 'border-primary ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full transition-transform duration-200 hover:scale-105 active:scale-95"
                disabled={plan.isCurrent}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
