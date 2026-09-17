-- Add the CSE 410 project to an existing deployment.

UPDATE public.projects
SET sort_order = sort_order + 1
WHERE sort_order >= 10
  AND id <> 13
  AND NOT EXISTS (
    SELECT 1 FROM public.projects WHERE id = 13
  );

INSERT INTO public.projects (
  id, title, category, date, subtitle, description, image_url,
  repo_link, deployed_at, tags, sort_order
) VALUES (
  13,
  'Ray Tracing',
  'Foundations',
  'September 14',
  'Computer Graphics',
  'Implemented ray-tracing functionality for objects, modeling how light reflects and refracts across different surfaces and how light-source position, luminance, color, and type affect the rendered scene.',
  '/images/computer-graphics-raytracing-14.webp',
  'https://github.com/excellencior/CSE-410-Computer-Graphics-Sessional',
  '',
  ARRAY['C++', 'Bitmap'],
  10
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  date = EXCLUDED.date,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  repo_link = EXCLUDED.repo_link,
  deployed_at = EXCLUDED.deployed_at,
  tags = EXCLUDED.tags,
  sort_order = EXCLUDED.sort_order;

DO $$
DECLARE
  sequence_name TEXT;
BEGIN
  sequence_name := pg_get_serial_sequence('public.projects', 'id');
  IF sequence_name IS NOT NULL THEN
    PERFORM setval(sequence_name::regclass, (SELECT MAX(id) FROM public.projects), true);
  END IF;
END $$;
