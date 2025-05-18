import express from 'express';
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificateRouter = express.Router();

certificateRouter.post('/generate-certificate', async (req, res) => {
    const { userName, category, score, total } = req.body;

    if (!userName || !category || score === undefined || total === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${category}_Quiz_Certificate.pdf"`);
        res.send(pdfBuffer);
    });

    // Certificate layout
    doc.fontSize(24).text('Certificate of Achievement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`This is to certify that`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text(userName, { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(16).text(`has successfully completed the`, { align: 'center' });
    doc.text(`${category} Quiz`, { align: 'center', bold: true });
    doc.text(`offered by the Indian Navy`, { align: 'center' });
    doc.moveDown();
    doc.text(`with a score of ${score} out of ${total}.`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text('Issued by Indian Navy', { align: 'center' });
    doc.moveDown();
    doc.text('Date: May 18, 2025', { align: 'center' });
    doc.moveDown(2);
    doc.text('__________________________', { align: 'center' });
    doc.text('Authorized Signatory', { align: 'center' });

    doc.end();
});

export default certificateRouter;
