web_interface <- function(refdir=NULL, vcfFile=NULL, bin.size=500000, 
                          outdir=".", num.snps=500) {
    # options(warn=-1)
    ####################
    #### PARAMETERS ####
    sys.data <- system.file(file.path("webApp"), package="CCLid")
    refdir <- '/data/ccl-files/'
    tmpdir <- '/data/ccl-files/output'
    #vcfFile=file.path(sys.data, 'a549.sample_id.vcf')
    
    ## Setup the tmp random identifier
    fls <- list.files(tmp.dir, pattern="tmp1_.*rda")
    ids <- as.integer(sapply(strsplit(unique(fls), split="\\."), function(i) i[[2]]))
    tmp.id <- 1
    while(tmp.id %in% ids){
      tmp.id <- ceiling(runif(n=1, min=0, max=1e6))
    }

    ##############
    #### MAIN ####
    ## Section 1: Identity setup
    commandArgs <- function(...) c(tmpdir, vcfFile, bin.size, refdir, num.snps, tmp.id)
    system(paste("Rscript", file.path(sys.data, "1_setupid.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "1_setupid.R"))
    # return(output)
    
    ## Section 2: CCL Identity
    commandArgs <- function(...) c(tmpdir, outdir, tmp.id)
    system(paste("Rscript", file.path(sys.data, "2_cclid.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "2_cclid.R"))

    ## Section 3: Drift setup
    commandArgs <- function(...) c(tmpdir, tmp.id)
    system(paste("Rscript", file.path(sys.data, "3_setupdrift.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "3_setupdrift.R"))
    
    ## Section 4: Drift
    commandArgs <- function(...) c(tmpdir, outdir, tmp.id)
    system(paste("Rscript", file.path(sys.data, "4_drift.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "4_drift.R"))
    
    

    ## Section 5: WebApp Return
    # commandArgs <- function(...) c(tmpdir)
    # system(paste("Rscript", file.path(sys.data, "5_return.R"), paste(commandArgs(), collapse=" "), sep=" "))
    # source(file.path(pipeline.dir, "5_return.R"))
    load(file.path(tmpdir, paste0("tmp4_drift.", tmp.id, ".rda")))  #Starts with 72Mb RES
    load(file.path(tmpdir, paste0("tmp2_pred.", tmp.id, ".rda")))  #Starts with 72Mb RES

    ## Cleanup:
    genfiles <- list.files(tmp.dir)
    if(all(c(paste0("seg.", tmp.id, ".json"), 
             paste0("drift.", tmp.id, ".json"), 
             paste0("pred.", tmp.id, ".json")) %in% genfiles)){
      setwd(tmp.dir)
      file.remove(c(paste0('tmp1_vcf_all.', tmp.id, '.rda'), 
                    paste0('tmp2_pred.', tmp.id, '.rda'),
                    paste0('tmp3_drift_vcf.', tmp.id, '.rda'), 
                    paste0('tmp4_drift.', tmp.id, '.rda')))
    }
    

    dat <- list("results"=TRUE,
                "error"=FALSE,
                "pred"=pred,
                "seg"=bdf$cna.obj[[1]]$output,
                "fraction"=bdf$frac[[1]])
    return(dat)
  
}

# receiving path data from r-script npm module of nodejs server
filePath <- input[[1]]

tryCatch({
    web_interface(vcfFile=filePath, outdir='/data/ccl-files/output')
}, error = function() {
    errorOutput <- list(
      "error"=TRUE,
      "message"="Error analysing vcf file"
    )
    return(errorOutput)
})
