# Ελλάδα Τώρα

Αυτοματοποιημένος ελληνικός ειδησεογραφικός aggregator με σύντομες περιλήψεις, ακριβείς παραπομπές, πραγματικές εικόνες από RSS και ιδιωτικό κέντρο σύνταξης.

## Υποδομή

- Next.js 16 / Vercel
- Supabase Postgres μέσω server-side REST
- Vercel Cron για το πρωινό briefing
- Resend για αποστολή email
- Προαιρετικό OpenAI Responses API για ελληνικές περιλήψεις

## Εγκατάσταση

1. Δημιούργησε Supabase project και εκτέλεσε το `supabase/schema.sql` στον SQL Editor.
2. Αντέγραψε το `.env.example` σε `.env.local` και συμπλήρωσε τις μεταβλητές.
3. Εκτέλεσε `npm install` και `npm run dev`.
4. Στο Vercel πρόσθεσε τις ίδιες μεταβλητές για Production, Preview και Development.

Το `SUPABASE_SERVICE_ROLE_KEY`, το `AUTH_SECRET`, το `ADMIN_PASSWORD`, το `OPENAI_API_KEY`, το `RESEND_API_KEY` και το `CRON_SECRET` είναι μυστικά και δεν πρέπει να μπουν ποτέ στο GitHub.

## Διαχειριστικό

Το `/admin` προστατεύεται με υπογεγραμμένο, HTTP-only cookie. Ο κωδικός ορίζεται αποκλειστικά από το `ADMIN_PASSWORD`.

## Αυτόματες εργασίες

Το `vercel.json` καλεί το newsletter στις 04:30 και 05:30 UTC. Το endpoint εκτελεί αποστολή μόνο όταν η τοπική ώρα `Europe/Athens` είναι 07:30, καλύπτοντας αυτόματα θερινή και χειμερινή ώρα.

Η ροή RSS ενημερώνεται το πολύ μία φορά ανά πέντε λεπτά και διατηρεί τα τελευταία αποθηκευμένα θέματα αν μία πηγή αποτύχει.
