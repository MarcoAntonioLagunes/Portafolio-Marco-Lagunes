import { caseStudyRoute } from "@/lib/case-study-route";

const route = caseStudyRoute("es");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
