import dynamic from 'next/dynamic';

export const MyComponent = dynamic(() => import('../components/MyComponent'), {
  ssr: false,
});

export const AnotherClientOnlyComponent = dynamic(() => import('../components/AnotherClientOnlyComponent'), {
  ssr: false,
});
