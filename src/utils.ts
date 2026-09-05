/**
 * Menyamarkan nomor NIP GTK dengan tanda '*' kecuali 2 angka dari belakang
 * Contoh: '197608152005011004' -> '****************04'
 * Jika kosong atau '-' maka mengembalikan '-'
 */
export const maskNip = (nip?: string | null): string => {
  if (!nip || nip.trim() === '' || nip.trim() === '-') {
    return '-';
  }
  const clean = nip.trim();
  if (clean.length <= 2) {
    return clean;
  }
  const lastTwo = clean.slice(-2);
  const prefix = clean.slice(0, -2);
  // Ganti seluruh karakter angka dan huruf dengan '*', pertahankan spasi jika ada
  const maskedPrefix = prefix.replace(/[0-9a-zA-Z]/g, '*');
  return maskedPrefix + lastTwo;
};
