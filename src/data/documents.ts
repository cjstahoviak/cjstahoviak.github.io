// Resume and CV PDFs. They are not stored in this repo: the
// Calvin-Stahoviak-Resume-CV repo builds them from LaTeX on every push and
// publishes them with GitHub Pages, which serves that repo's site under this
// domain. These paths therefore always point at the latest versions, and
// updating the PDFs never requires rebuilding this site.
//
// Link here directly when a page needs the file itself (e.g. a `download`
// button). /resume and /cv (src/pages) are short links for sharing that
// forward to these same paths.

const base = '/Calvin-Stahoviak-Resume-CV';

export const resumePdf = `${base}/Calvin_Stahoviak_Resume.pdf`;
export const cvPdf = `${base}/Calvin_Stahoviak_CV.pdf`;
