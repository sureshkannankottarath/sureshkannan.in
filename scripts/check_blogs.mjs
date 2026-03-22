import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://gtejkmnvjvzgzsfzvagw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZWprbW52anZ6Z3pzZnp2YWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNjU2MzksImV4cCI6MjA4OTc0MTYzOX0.WKYPuLQWkAKV9NN2xFd51Mcwo2U49CpZoWWvhvt5mzI"
);

try {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    console.log("BLOG_DATA:");
    console.log(JSON.stringify(data, null, 2));
} catch (e) {
    console.error(e);
}
