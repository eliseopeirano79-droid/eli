import {ELI_CLINICAL_BATCH} from './eli-clinical-batch.js';
/* One explicit registry for the currently published content layers. */
import {appendContentBatches} from './elix-content-batches.js';
import {ESSENTIAL_BATCH} from './elix-essential-batch.js';
import {ALPHABET_A_BATCH} from './elix-alphabet-a.js';
import {ABC_CONTINUATION_BATCH} from './elix-abc-continuation.js';
export const ADDITIONAL_CONTENT_BATCHES=[ESSENTIAL_BATCH,ALPHABET_A_BATCH,ABC_CONTINUATION_BATCH,ELI_CLINICAL_BATCH];
export function appendAllContentBatches(editorial,pk){
 appendContentBatches(editorial,pk);
 for(const batch of ADDITIONAL_CONTENT_BATCHES)appendContentBatches(editorial,pk,batch);
}
