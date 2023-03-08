import path from "path"
import { promises as fs } from 'fs'

export async function getDataPageFromJSON(file: string): Promise<{
  sections: any,
  meta: any,
  filtro?: boolean,
  programs?: any[],
  config?: any,
  form?: any,
  banners?: any[],
  related_post_title?: string,
  blog_section?: any,
}> {
  const bucket = path.join(process.cwd(), process.env.DIRECTORY!);

  return JSON.parse(await fs.readFile(`${bucket}/${file}`, 'utf8'))
}