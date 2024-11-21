export const generateUniqueFileName = (originalName: string): string => {
    const timestamp = Date.now(); // Timestamp atual
    const randomNumber = Math.floor(Math.random() * 99999); // Número aleatório entre 0 e 999999
    const sanitizedOriginalName = originalName.replace(/\s+/g, "_").toLowerCase(); // Substitui espaços e normaliza
    
    return `${timestamp}-${randomNumber}-${sanitizedOriginalName}`;
  };
  