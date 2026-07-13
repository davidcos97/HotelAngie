import Hero from "@/components/home/Hero";
import PromotionsSection from "@/components/home/PromotionsSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import GallerySection from "@/components/home/GallerySection";
import ReviewsSection from "@/components/home/ReviewsSection";
import LocationSection from "@/components/home/LocationSection";
import BlogPreview from "@/components/home/BlogPreview";
import FaqPreview from "@/components/home/FaqPreview";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromotionsSection />
      <FeaturedRooms />
      <ServicesSection />
      <ExperiencesSection />
      <GallerySection />
      <ReviewsSection />
      <LocationSection />
      <BlogPreview />
      <FaqPreview />
      <ContactSection />
    </>
  );
}
