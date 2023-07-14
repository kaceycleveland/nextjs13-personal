// route handler with secret and slug
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPostBySlug } from 'utils/sanity.client'
 
export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  console.log(slug);
 
  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN || !slug) {
    return new Response('Invalid token', { status: 401 })
  }
 
  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const posts = await getPostBySlug(slug, true);

 
  // If the slug doesn't exist prevent draft mode from being enabled
  if (!posts.length || !posts[0].slug) {
    return new Response('Invalid slug', { status: 401 })
  }


 
  // Enable Draft Mode by setting the cookie
  draftMode().enable()
 
  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(`/posts/${posts[0].slug.current}`)
}