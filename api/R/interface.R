# needs("CCLWebInterface")
# needs("future")
# attach(input[[1]])

web_interface <- function(refdir=NULL, vcfFile=NULL, bin.size=500000, 
                          outdir=".", num.snps=500) {
    # options(warn=-1)
    ####################
    #### PARAMETERS ####
    warning('HERE')
    sys.data <- system.file(file.path("extdata"), package="CCLWebInterface")
    refdir <- '/data/ccl-files/'
    tmpdir <- '/data/ccl-files/output'
    #vcfFile=file.path(sys.data, 'a549.sample_id.vcf')

    output <- 'Preemptive return'
    

    ##############
    #### MAIN ####
    ## Section 1: Identity setup
    commandArgs <- function(...) c(tmpdir, vcfFile, bin.size, refdir, num.snps)
    system(paste("Rscript", file.path(sys.data, "1_setupid.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "1_setupid.R"))
    # return(output)
    
    

    ## Section 2: CCL Identity
    commandArgs <- function(...) c(tmpdir, outdir)
    system(paste("Rscript", file.path(sys.data, "2_cclid.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "2_cclid.R"))
    
    

    ## Section 3: Drift setup
    commandArgs <- function(...) c(tmpdir)
    system(paste("Rscript", file.path(sys.data, "3_setupdrift.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "3_setupdrift.R"))
    
    ## Section 4: Drift
    commandArgs <- function(...) c(tmpdir, outdir)
    system(paste("Rscript", file.path(sys.data, "4_drift.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "4_drift.R"))
    
    

    ## Section 5: WebApp Return
    # commandArgs <- function(...) c(tmpdir)
    # system(paste("Rscript", file.path(sys.data, "5_return.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "5_return.R"))
    load(file.path(tmpdir, "tmp4_drift.rda"))  #Starts with 72Mb RES
    load(file.path(tmpdir, "tmp2_pred.rda"))  #Starts with 72Mb RES

    ## Cleanup:
    genfiles <- list.files(tmpdir)
    if(all(c("seg.json", "drift.json", "pred.json") %in% genfiles)){
      setwd(tmpdir)
      file.remove(c('tmp1_vcf_all.rda', 'tmp2_pred.rda', 
                    'tmp3_drift_vcf.rda', 'tmp4_drift.rda'))
    }
    

    dat <- list("results"=TRUE,
                "pred"=pred,
                "seg"=bdf$cna.obj[[1]]$output,
                "fraction"=bdf$frac[[1]])
    return(dat)
  
}

filePath <- input[[1]]

web_interface(vcfFile=filePath, outdir='/data/ccl-files/output')