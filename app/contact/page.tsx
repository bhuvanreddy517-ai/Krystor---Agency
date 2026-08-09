import Nav from "@/components/layout/Nav";
import ContactModal from "@/components/ui/ContactModal";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactModal isStandalonePage={true} />
      </main>
    </>
  );
}
