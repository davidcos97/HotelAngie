import Hero from "@/components/home/Hero";
import PromotionsSection from "@/components/home/PromotionsSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import BrandSection from "@/components/home/BrandSection";
import GallerySection from "@/components/home/GallerySection";
import ReviewsSection from "@/components/home/ReviewsSection";
import SocialSection from "@/components/home/SocialSection";
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
      <BrandSection />
      <GallerySection />
      <ReviewsSection />
      <SocialSection />
      <LocationSection />
      <BlogPreview />
      <FaqPreview />
      <ContactSection />
    </>
  );
}
