# CCLID Web Application

## About

The web application is built around CCLid R package and meant to address the lack of a publicly available resource for genotype-based cell line authentication. We developed this resource to allow for genotype-matching of any given cancer cell line to the 1,497 unique cancer cell lines found in the GDSC, CCLE or gCSI datasets. Using the B-allele frequencies (BAFs) for all SNPs found in common between the input and reference datasets, this web application will allow for a genotype matching operation that trains and uses a logistic model to calculate the probability of the best cell line matches.

As BAFs can be viewed as an indirect representation of karyotype (i.e. AB has a 0.5/0.50 BAF,while AAB would have a 0.66/0.33 BAF), we developed this tool to scan for segments of the genome that are significantly different between genotypically “matching” cell lines. This function allows for the inference of karyotypically discordant regions, hence representing what is likely to be genetic drift.

## Setup Instructions

- Clone the repo
  
```bash
git clone git@github.com:bhklab/CCL_webapp.git
cd CCL_webapp
```

- In the project directory, install all server dependencies `npm i`
- Create .env using .env.example
- Start the server by running `npm start` or `npm run devstart` (development mode) command
- Start the client (development mode) by running `cd client && npm start`
- To perform real time analysis, the application requires CCLid R package installed. To install the package, please run following R commands:

```{r}
devtools::install_github('bhklab/CCLid')
library(CCLid)
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dependencies

- React
- React-Table
- PlotlyJS
- Axios
- Express
- Body-parser
- Multer
- R-script
- [CCLid](https://github.com/bhklab/CCLid) R package

## Dev Dependenices

- Nodemon
- Eslint

## Build Instructions

Builds the app for production to the `build` folder. Run `npm run build` command from client folder

## License

This project is under the Apache-2.0 License - see [LICENSE](LICENSE) for details.
