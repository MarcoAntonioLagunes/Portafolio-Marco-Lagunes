import { caseStudyRoute } from "@/lib/case-study-route";
import { OG_SIZE } from "@/lib/og";

const route = caseStudyRoute("es");

export const alt = "Marco Lagunes";
export const size = OG_SIZE;
export const contentType = "image/png";
export const generateStaticParams = route.generateStaticParams;
export default route.OgImage;
