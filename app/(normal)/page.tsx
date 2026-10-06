import { Container } from "@/components/common/container";

export default function Home() {
  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold">Welcome to Miraya Diamonds</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Start building your application here.
      </p>
    </Container>
  );
}