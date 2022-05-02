import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from "moment";


const Reports = () => {

  const myData=[
    {
      date: moment("20-08-2022","DD ,MM,yyyy").format("DD MMM, yyyy"),
      gp:2000,
      np:5000,
      exp:30000,
      pp:`${35}%`,
      ep:`${65}`,
      dividend:1000,
      ia:100000,
      ti:15000,
      tpp:`${45}%`

    },
    {
      date: moment("23-01-2022","DD ,MM,yyyy").format("DD MMM, yyyy"),
      gp:2000,
      np:5000,
      exp:30000,
      pp:`${35}%`,
      ep:`${65}`,
      dividend:1000,
      ia:100000,
      ti:15000,
      tpp:`${45}%`
    }
  ]
 const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


  return (
    <AppLayout pageName="Reports">
        <Container>
            <Grid container spacing={3}>
                <Table  style={{ height: 200, width: "150%" ,letterSpacing:10, } }>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Gross Profit</TableCell>
                    <TableCell>Net Profit</TableCell>
                    <TableCell>Expense</TableCell>
                    <TableCell>Percentage Profit</TableCell>
                    <TableCell>Exp Percentage</TableCell>
                    <TableCell>Dividend</TableCell>
                    <TableCell>Invested Amount</TableCell>
                    <TableCell>Total Invested</TableCell>
                    <TableCell>Total Profit Percentage</TableCell>    
                    <TableCell>Action</TableCell>                
                  </TableRow>
                </TableHead>
                <TableBody>
                   { myData.map((data) => (
                     <TableRow>
                      <StyledTableCell>{data.date}</StyledTableCell>
                      <StyledTableCell>{data.gp}</StyledTableCell>
                      <StyledTableCell>{data.np}</StyledTableCell>
                      <StyledTableCell>{data.exp}</StyledTableCell>
                      <StyledTableCell>{data.ep}</StyledTableCell>
                      <StyledTableCell>{data.pp}</StyledTableCell>
                      <StyledTableCell>{data.dividend}</StyledTableCell>
                      <StyledTableCell>{data.ia}</StyledTableCell>
                      <StyledTableCell>{data.ti}</StyledTableCell>
                      <StyledTableCell>{data.tpp}</StyledTableCell>
                      <StyledTableCell><input type="file" /></StyledTableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
            </Grid>
        </Container>
    </AppLayout>
  );
};

export default Reports;
















