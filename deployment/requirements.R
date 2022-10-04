# installs all R dependencies for the project.

if (!require("devtools")) {
  install.packages("devtools")
}

if (!requireNamespace("BiocManager", quietly = TRUE)){
  install.packages("BiocManager")
}

install.packages("remotes")
install.packages('downloader')
install.packages("dplyr")
install.packages("RColorBrewer")
install.packages('reshape2')
install.packages("Rfast")
install.packages('scales')

BiocManager::install("BSgenome.Hsapiens.UCSC.hg19")
BiocManager::install("DNAcopy")
BiocManager::install("GenomicRanges")
BiocManager::install("copynumber")
BiocManager::install("preprocessCore")
BiocManager::install("TxDb.Hsapiens.UCSC.hg19.knownGene")
BiocManager::install("org.Hs.eg.db")
BiocManager::install("PharmacoGx")
BiocManager::install("VariantAnnotation")
devtools::install_github('linxihui/NNLM')
install.packages("philentropy")

remotes::install_github("jimvine/rcellosaurus")

devtools::install_github("bhklab/CCLid")