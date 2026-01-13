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
            scale: 2,
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
                    clonedElement.style.width = '800px'; // Concrete width for layout

                    // Ensure all parent elements in the clone are also visible
                    let parent = clonedElement.parentElement;
                    while (parent && parent.tagName !== 'HTML') {
                        parent.style.display = 'block';
                        parent.style.visibility = 'visible';
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
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);

        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
