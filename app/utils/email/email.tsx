import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Hr,
  Tailwind,
} from "jsx-email";

type Props = {
  name: string;
  position: string;
};

export function Email({ name, position }: Props) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 py-8 font-sans text-base text-gray-800">
          <Container className="bg-white px-6 py-2 rounded-md shadow-md max-w-xl mx-auto">
            <Heading className="text-2xl font-bold mb-4">
              📩 You got a new message!
            </Heading>
            <div className="mb-4  whitespace-pre-line border border-gray-200 rounded-xl leading-1">
              <Text className="text-start">Hi {name.split(" ")[0]},</Text>
              <Text className="text-start">
                Your request for the <span className="font-semibold">{position}</span> has been approved.
              </Text>
              <Text className="text-start font-semibold">
                Click here to continue 👉:{" "}
                <Link
                  href="https://refhire.xyz"
                  className="text-blue-600 font-medium underline"
                >
                  refhire.xyz
                </Link>
              </Text>
            </div>

            <Hr className="my-6 border-gray-200" />

            <Text className="font-semibold leading-1">
              ✅ Note*: If you need any assistance, feel free to reach out to
              us.
            </Text>
            <Text className="font-semibold">
              Telegram:{" "}
              <Link
                href="https://t.me/abhishek_lingwal"
                className="text-blue-600 font-medium underline"
              >
                @abhishek_lingwal
              </Link>
              <br />
              Email:{" "}
              <Link
                href="mailto:hi@refhire.com"
                className="text-blue-600 font-medium underline"
              >
                hi@refhire.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default Email;
