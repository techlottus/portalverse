import type { DynamicPageData } from "@/utils/getPagesData";

export const isValidPath = (path: string) => {
  return !!path?.trim() && !path?.includes("//") && !path?.includes(" ");
};

/**
 * Normalizes the path format by removing any slashes at the beginning and end of a path. For instance,
 * "/a/b", "a/b/" and "/a/b/" all end up as "a/b" 
 * Taken from: https://stackoverflow.com/questions/19134860/javascript-remove-strings-in-beginning-and-end
 */
export const normalizePath = (path: string) => path?.replace(/(^\/+|\/+$)/gm, "");

export const getDynamicPagesBreadcrumbs = (
  pages: Array<DynamicPageData>
): Record<string, string> => {
  const breadcrumbs: Record<string, string> = {};

  pages?.forEach((page) => {
    const slug = normalizePath(page?.attributes?.slug);
    const pathSegments = slug?.split("/");
    const lastPathSegment = pathSegments?.[pathSegments?.length - 1];

    const breadcrumbLabel = page?.attributes?.breadcrumb || "";

    breadcrumbs[lastPathSegment] = breadcrumbLabel;
  });

  return breadcrumbs;
};