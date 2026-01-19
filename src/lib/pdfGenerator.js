import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generate and download a PDF from a DOM element
 * @param {string} elementId - The ID of the DOM element to capture
 * @param {string} filename - The name of the file to save
 */
export const downloadPDF = async (elementId, filename = 'nota.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            onclone: (clonedDoc) => {
                // Inside the clone, we make everything visible for capture
                const clonedElement = clonedDoc.getElementById(elementId);
                if (clonedElement) {
                    clonedElement.style.display = 'block';
                    clonedElement.style.visibility = 'visible';
                    clonedElement.style.position = 'relative';
                    clonedElement.style.width = '800px';
                    clonedElement.style.height = 'auto';
                    clonedElement.style.minHeight = 'min-content';
                    clonedElement.style.overflow = 'visible';

                    // Ensure all parent elements in the clone are also expanded and visible
                    let parent = clonedElement.parentElement;
                    while (parent && parent.tagName !== 'HTML') {
                        parent.style.display = 'block';
                        parent.style.visibility = 'visible';
                        parent.style.height = 'auto';
                        parent.style.minHeight = 'min-content';
                        parent.style.overflow = 'visible';
                        parent = parent.parentElement;
                    }
                }
            }
        });

        if (canvas.width === 0 || canvas.height === 0) {
            throw new Error('Canvas capture failed: Width or height is 0. Ensure the element is renderable.');
        }

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true, // Aktifkan kompresi internal PDF
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Gunakan JPEG dengan kualitas 0.7 untuk kompresi file yang signifikan (jauh lebih kecil dari PNG)
        const imgData = canvas.toDataURL('image/jpeg', 0.7);

        // Handle multi-page
        let heightLeft = pdfHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        // Add extra pages if needed
        while (heightLeft > 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
        }

        pdf.save(filename);
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
