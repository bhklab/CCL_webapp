// removes dataset name from the cell line
const extractCellLine = str => str.split(/_(.+)/)[1]

export default extractCellLine