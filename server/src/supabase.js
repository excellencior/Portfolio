const getHeaders = () => ({
  apikey: process.env.SUPABASE_SECRET_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
});

const getBaseUrl = (table) => `${process.env.SUPABASE_URL}/rest/v1/${table}`;

export const supabaseGet = async (table, options = {}) => {
  let url = getBaseUrl(table);
  const query = [];
  if (options.select) query.push(`select=${options.select}`);
  if (options.order) query.push(`order=${options.order}`);
  if (options.eq) query.push(`${options.eq.column}=eq.${options.eq.value}`);

  if (query.length > 0) {
    url += `?${query.join("&")}`;
  }

  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Supabase GET error: ${res.statusText}`);
  const data = await res.json();
  return { data, error: null };
};

export const supabaseGetSingle = async (table, id) => {
  const url = `${getBaseUrl(table)}?id=eq.${id}&limit=1`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Supabase GET Single error: ${res.statusText}`);
  const data = await res.json();
  return { data: data[0] || null, error: null };
};

export const supabaseUpsert = async (table, dataToUpsert) => {
  const url = getBaseUrl(table);
  const headers = getHeaders();
  headers.Prefer = "resolution=merge-duplicates,return=representation";

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(dataToUpsert)
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Supabase Upsert error: ${res.statusText} - ${errBody}`);
  }
  const data = await res.json();
  return { data, error: null };
};

export const supabaseUpdate = async (table, id, dataToUpdate) => {
  const url = `${getBaseUrl(table)}?id=eq.${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(dataToUpdate)
  });
  if (!res.ok) throw new Error(`Supabase Update error: ${res.statusText}`);
  const data = await res.json();
  return { data, error: null };
};

export const supabaseDelete = async (table, id) => {
  const url = `${getBaseUrl(table)}?id=eq.${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Supabase Delete error: ${res.statusText}`);
  return { error: null };
};
