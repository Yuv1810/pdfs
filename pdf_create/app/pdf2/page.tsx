// CustomTablePDF.js
"use client";
import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet,Table, TableHeader, TableCell, TableBody, TableRow } from '@react-pdf/renderer';

// Define styles1 for the PDF
const styles1 = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: '20px 0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    display: 'table-row',
    flexDirection: 'row',
  },
  fisrtcell:{
    borderStyle: 'solid',
    flex:1,
    borderWidth: 1,
    borderColor: '#000',
    // padding: 8,
    fontSize:8,
    textAlign: 'center',

  },
  cell: {
    borderStyle: 'solid',
    flex:1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    fontSize:8,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#003366',
    color: '#fff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "10%", // Adjust this percentage according to the total columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColWide: {
    width: "20%", // Example for colSpan=2; Adjust this percentage for wider columns
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    padding: 5,
    fontSize: 10,
  },
  tableColWide1: {
    width:'40%',
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});


const styles2 = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 9,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    backgroundColor: '#222b35',
    color: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#222b35',
    padding: 3,
    fontSize: 10,
    textAlign: 'center',
  },
  tableCell: {
    borderStyle: 'solid',
    borderRight: 1,
    borderTop: 1,
    borderColor: '#222b35',
    padding: 3,
    fontSize: 9,
    paddingTop:6,
    paddingBottom:6,
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  subtotal: {
    flexDirection: 'row',
    fontWeight: 'bold',
    padding: 3,
    backgroundColor: '#E0E0E0',
  },
  total: {
    flexDirection: 'row',
    fontWeight: 'bold',
    padding: 3,
  },
});

const styles3 = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  clientDetailsContainer: {
    flexDirection: 'row',
    border: '1px solid black',
  },
  clientDetails: {
    width: '50%',
   
    borderRight: '1px solid black',
  },
  summary: {
    width: '50%',
   
  },
  sectionHeader: {
    backgroundColor: '#354A81',
    color: 'white',
    padding: 5,
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    // borderRight: '1px solid black',
    
  },
  tableCell: {
    flex: 1,
    textAlign: 'right',
    padding: 10,
    borderRight: '1px solid black',
  },
  labelCell: {
    flex: 2,
    textAlign: 'left',
    padding: 10,
    borderRight: '1px solid black',
  },
  totalDue: {
    flexDirection: 'row',
    backgroundColor: '#E6EEF7',
    padding: 10,
    fontSize: 12,
    border: '1px solid black',
  },
  totalDueLabel: {
    flex: 1,
    textAlign: 'left',
  },
  totalDueValue: {
    flex: 1,
    textAlign: 'right',
  },
});

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#D1DCED', // Light blue background for the header
    padding: 10,
    marginBottom:20,
  },
  titleContainer: {
    backgroundColor: '#AEB9D4', // Darker blue for the title
    paddingVertical: 10,
    paddingHorizontal: 15,
    
  },
  titleText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight:'auto',
    marginLeft:'auto',
  },
  clientInfoText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight:'auto',
    marginLeft:'auto',
  },
});


// Create a component for the table
const CustomTablePDF = ({ data }:any) => {
  const calculateTotals = (periods:any) => {
    return periods.reduce((acc:any, item:any) => {
      acc.arrearsBF.amount += item.arrearsBF.amount;
      acc.arrearsBF.vat += item.arrearsBF.vat;
      acc.demanded.amount += item.demanded.amount;
      acc.demanded.vat += item.demanded.vat;
      acc.paid.amount += item.paid.amount;
      acc.paid.vat += item.paid.vat;
      acc.arrearsCF.amount += item.arrearsCF.amount;
      acc.arrearsCF.vat += item.arrearsCF.vat;
      return acc;
    }, {
      arrearsBF: { amount: 0, vat: 0 },
      demanded: { amount: 0, vat: 0 },
      paid: { amount: 0, vat: 0 },
      arrearsCF: { amount: 0, vat: 0 },
    });
  };

  const grandTotals = data.reduce((acc:any, item:any) => {
    const itemTotals = calculateTotals(item.periods);
    acc.arrearsBF.amount += itemTotals.arrearsBF.amount;
    acc.arrearsBF.vat += itemTotals.arrearsBF.vat;
    acc.demanded.amount += itemTotals.demanded.amount;
    acc.demanded.vat += itemTotals.demanded.vat;
    acc.paid.amount += itemTotals.paid.amount;
    acc.paid.vat += itemTotals.paid.vat;
    acc.arrearsCF.amount += itemTotals.arrearsCF.amount;
    acc.arrearsCF.vat += itemTotals.arrearsCF.vat;
    return acc;
  }, {
    arrearsBF: { amount: 0, vat: 0 },
    demanded: { amount: 0, vat: 0 },
    paid: { amount: 0, vat: 0 },
    arrearsCF: { amount: 0, vat: 0 },
  });

  return (
    <Document>
      <Page size="A3" style={styles1.page}>

      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>STATEMENT OF CLIENT INCOME</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.clientInfoText}>
            CLIENT: ALEXANDER REECE THOMSON LLP
          </Text>
          <Text style={styles.clientInfoText}>
            FINANCIAL YEAR: Y/E DEC-23
          </Text>
        </View>
      </View>

        <View style={styles1.table}>
        <View style={styles1.tableRow}>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Tenant/Property</Text>
          </View>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Period</Text>
          </View>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Arrears B/F</Text>
          </View>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Demanded</Text>
          </View>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Paid</Text>
          </View>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Arrears C/F</Text>
          </View>
        </View>
        <View style={styles1.tableRow}>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}></Text>
          </View>
          <View style={[styles1.tableColWide ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}></Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Amount</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>VAT</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Amount</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>VAT</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Amount</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>VAT</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>Amount</Text>
          </View>
          <View style={[styles1.tableCol ,{ backgroundColor: '#203764' }]}>
            <Text style={[styles1.tableCell ,{ color: 'white' }]}>VAT</Text>
          </View>
        </View>




       

          {data.map((item:any, index:any) => (
            <React.Fragment key={index}>
              {item.periods.map((periodItem:any, i:any) => (
                <View style={styles1.row} key={i}>
                    <View style={styles1.tableColWide}>
                  <Text style={styles1.tableCell}>{item.property}{item.tenant}</Text>
                  </View>
                  <View style={styles1.tableColWide}>
                  <Text style={styles1.tableCell}>{periodItem.description}<br/>{periodItem.period}</Text>
                  </View>
                  <View style={styles1.tableCol}>

                  <Text style={styles1.tableCell}>{periodItem.arrearsBF.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  
                  <Text style={styles1.tableCell}>{periodItem.arrearsBF.vat.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  <Text style={styles1.tableCell}>{periodItem.demanded.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  <Text style={styles1.tableCell}>{periodItem.demanded.vat.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  <Text style={styles1.tableCell}>{periodItem.paid.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  <Text style={styles1.tableCell}>{periodItem.paid.vat.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  <Text style={styles1.tableCell}>{periodItem.arrearsCF.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles1.tableCol}>
                  <Text style={styles1.tableCell}>{periodItem.arrearsCF.vat.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
              <View style={styles1.row}>
              <View style={styles1.tableColWide1}>
                <Text style={[styles1.tableCell ,{fontWeight: 'bold'}]}>Sub-total (£)</Text>
                </View>
                
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).arrearsBF.amount.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).arrearsBF.vat.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).demanded.amount.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).demanded.vat.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).paid.amount.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).paid.vat.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).arrearsCF.amount.toFixed(2)}</Text>
                    </View>
                <View style={styles1.tableCol}>
                    <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{calculateTotals(item.periods).arrearsCF.vat.toFixed(2)}</Text>
                </View>
                </View>
            </React.Fragment>
          ))}
          <View style={styles1.row}>

          <View style={styles1.tableColWide1}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}]} >Grand Total (£)</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.arrearsBF.amount.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.arrearsBF.vat.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.demanded.amount.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.demanded.vat.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.paid.amount.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.paid.vat.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}] }>{grandTotals.arrearsCF.amount.toFixed(2)}</Text>
            </View>
            <View style={styles1.tableCol}>
                <Text style={[styles1.tableCell,{fontWeight: 'bold'}]}>{grandTotals.arrearsCF.vat.toFixed(2)}</Text>
          </View>
          </View>
        </View>
      </Page>
      
      <Page size="A3" style={styles2.page}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>STATEMENT OF CLIENT EXPENDITURE</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.clientInfoText}>
            CLIENT: ALEXANDER REECE THOMSON LLP
          </Text>
          <Text style={styles.clientInfoText}>
            FINANCIAL YEAR: Y/E DEC-23
          </Text>
        </View>
      </View>
      <View style={styles2.table}>
        {/* Table Header */}
        <View style={styles2.tableRow}>
          <Text style={[styles2.tableCellHeader, { width: '35%' }]}>Tenant/Property</Text>
          <Text style={[styles2.tableCellHeader, { width: '10%' }]}>Invoice Date</Text>
          <Text style={[styles2.tableCellHeader, { width: '15%' }]}>Supplier</Text>
          <Text style={[styles2.tableCellHeader, { width: '20%' }]}>Details of Expenditure</Text>
          <Text style={[styles2.tableCellHeader, { width: '10%' }]}>Amount</Text>
          <Text style={[styles2.tableCellHeader, { width: '10%' }]}>VAT</Text>
        </View>

        {/* First Row Group */}
        <View style={styles2.tableRow}>
          <Text style={[styles2.tableCell, { width: '35%' }]}>
            53-55 Bridge Street, Evesham EF14 4RD {"\n"} Abdelilah Frindi t/a Pound Plus
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>
            24.04.24 {"\n"} 23.05.23 {"\n"} 03.06.23 {"\n"} 05.07.24
          </Text>
          <Text style={[styles2.tableCell, { width: '15%' }]}>
            ABC Roofing {"\n"} EDF Energy {"\n"} XYZ Limited {"\n"} Other Business
          </Text>
          <Text style={[styles2.tableCell, { width: '20%' }]}>
            Roof repairs {"\n"} Utilities (Gas) {"\n"} Handyman services - clearing a blocked drain {"\n"} Cleaning of common parts
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>
            1,000.00 {"\n"} 500.00 {"\n"} 2,500.00 {"\n"} 500.00
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>
            200.00 {"\n"} 100.00 {"\n"} 500.00 {"\n"} 0.00
          </Text>
        </View>

        {/* Subtotal for First Row Group */}
        <View style={styles2.tableRow}>
          <Text style={[styles2.tableCell, { width: '80%', textAlign: 'right', paddingRight: 5 }]}>
            Sub-total (£)
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>4,500.00</Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>800.00</Text>
        </View>

        {/* Second Row Group */}
        <View style={styles2.tableRow}>
          <Text style={[styles2.tableCell, { width: '35%' }]}>
            TMD House, 34 Welbeck Street, W1W 7FD {"\n"} Unit B - Yogahaven
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>
            24.04.24 {"\n"} 23.05.23 {"\n"} 03.06.23 {"\n"} 05.07.24
          </Text>
          <Text style={[styles2.tableCell, { width: '15%' }]}>
            ABC Roofing {"\n"} EDF Energy {"\n"} XYZ Limited {"\n"} Other Business
          </Text>
          <Text style={[styles2.tableCell, { width: '20%' }]}>
            Roof repairs {"\n"} Utilities (Gas) {"\n"} Handyman services - clearing a blocked drain {"\n"} Cleaning of common parts
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>
            100.00 {"\n"} 355.00 {"\n"} 200.00 {"\n"} 500.00
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>
            20.00 {"\n"} 71.00 {"\n"} 40.00 {"\n"} 0.00
          </Text>
        </View>

        {/* Subtotal for Second Row Group */}
        <View style={styles2.tableRow}>
          <Text style={[styles2.tableCell, { width: '80%', textAlign: 'right', paddingRight: 5 }]}>
            Sub-total (£)
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>1,155.00</Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%' }]}>131.00</Text>
        </View>

        {/* Total */}
        <View style={styles2.tableRow}>
          <Text style={[styles2.tableCell, { width: '80%', textAlign: 'right', paddingRight: 5, backgroundColor: '#d8e1f1' }]}>
            TOTAL
          </Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%', backgroundColor: '#d8e1f1' }]}>5,655.00</Text>
          <Text style={[styles2.tableCell, styles2.textRight, { width: '10%', backgroundColor: '#d8e1f1' }]}>931.00</Text>
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles3.page}>
    <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>STATEMENT OF CLIENT ACCOUNT</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.clientInfoText}>
            CLIENT: ALEXANDER REECE THOMSON LLP
          </Text>
          <Text style={styles.clientInfoText}>
            FINANCIAL YEAR: Y/E DEC-23
          </Text>
        </View>
      </View>
      {/* Client Details and Summary Header */}
      <View style={styles3.clientDetailsContainer}>
        <View style={styles3.clientDetails}>
          <Text style={styles3.sectionHeader}>Client Details</Text>
          <Text>Alexander Reece Thomson LLP</Text>
          <Text>The White House</Text>
          <Text>26 Mortimer Street</Text>
          <Text>London</Text>
          <Text>W1W 7RB</Text>
          <Text>Contact: Nigel Lenson</Text>
        </View>
        <View style={styles3.summary}>
          <Text style={styles3.sectionHeader}>Summary of Income and Expenditure</Text>
          {/* Table Rows */}
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Total Income</Text>
            <Text style={styles3.tableCell}>13,458.33</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Plus VAT</Text>
            <Text style={styles3.tableCell}>2,691.67</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}>16,150.00</Text>
          </View>
         
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>LESS</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Total Expenditure</Text>
            <Text style={styles3.tableCell}>5,655.00</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Plus VAT</Text>
            <Text style={styles3.tableCell}>1,131.00</Text>
            <Text style={styles3.tableCell}>6,786.00</Text>
            <Text style={styles3.tableCell}></Text>
          </View>

          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>LESS</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Management Commission</Text>
            <Text style={styles3.tableCell}>800.00</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Plus VAT</Text>
            <Text style={styles3.tableCell}>160.00</Text>
            <Text style={styles3.tableCell}>960.00</Text>
            <Text style={styles3.tableCell}>7,746.00</Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Balance</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}>8,404.00</Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>LESS</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
          </View>
          <View style={styles3.tableRow}>
            <Text style={styles3.labelCell}>Payment on Account</Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}></Text>
            <Text style={styles3.tableCell}>1,500.00</Text>
          </View>
        </View>
      </View>
      {/* Total Due */}
      <View style={styles3.totalDue}>
        <Text style={styles3.totalDueLabel}>TOTAL DUE (£)</Text>
        <Text style={styles3.totalDueValue}>6,904.00</Text>
      </View>
    </Page>


    </Document>
  );
};

import { PDFDownloadLink } from '@react-pdf/renderer';


export default function App1(){
    const data = [
        {
          property: "53-55 Bridge Street, Evesham EF14 4RD",
          tenant: "Abdelilah Frindi t/a Pound Plus",
          periods: [
            { description: "Rent Arrears b/f (former agent)", period: "01/04/23 - 30/04/23", arrearsBF: { amount: 1458.33, vat: 291.67 }, demanded: { amount: 1458.33, vat: 291.67 }, paid: { amount: 1458.33, vat: 291.67 }, arrearsCF: { amount: 0.00, vat: 0.00 }},
            { description: "Rent", period: "01/05/23 - 31/05/23", arrearsBF: { amount: 1458.33, vat: 291.67 }, demanded: { amount: 1458.33, vat: 291.67 }, paid: { amount: 0.00, vat: 0.00 }, arrearsCF: { amount: 1458.33, vat: 291.67 }},
            { description: "Rent", period: "01/06/23 - 30/06/23", arrearsBF: { amount: 507.55, vat: 101.51 }, demanded: { amount: 507.55, vat: 101.51 }, paid: { amount: 0.00, vat: 0.00 }, arrearsCF: { amount: 507.55, vat: 101.51 }},
            { description: "Insurance", period: "30/08/22 - 29/08/23", arrearsBF: { amount: 1458.33, vat: 291.67 }, demanded: { amount: 1458.33, vat: 291.67 }, paid: { amount: 0.00, vat: 0.00 }, arrearsCF: { amount: 1458.33, vat: 291.67 }}
          ]
        },
        {
          property: "12-14 High Street, Stratford ST2 7JF",
          tenant: "Jane Doe Ltd",
          periods: [
            { description: "Rent Arrears b/f (former agent)", period: "01/01/23 - 31/01/23", arrearsBF: { amount: 1234.56, vat: 246.91 }, demanded: { amount: 1234.56, vat: 246.91 }, paid: { amount: 1234.56, vat: 246.91 }, arrearsCF: { amount: 0.00, vat: 0.00 }},
            { description: "Rent", period: "01/02/23 - 28/02/23", arrearsBF: { amount: 1234.56, vat: 246.91 }, demanded: { amount: 1234.56, vat: 246.91 }, paid: { amount: 1234.56, vat: 246.91 }, arrearsCF: { amount: 0.00, vat: 0.00 }},
            { description: "Insurance", period: "01/01/23 - 31/12/23", arrearsBF: { amount: 1234.56, vat: 246.91 }, demanded: { amount: 1234.56, vat: 246.91 }, paid: { amount: 1234.56, vat: 246.91 }, arrearsCF: { amount: 0.00, vat: 0.00 }}
          ]
        }
      ];
    return(
        <div>
            <h1>Generated PDF</h1>
       {/* <button className='bg-blue-200 h-10 w-40' onClick={}> */}
        <PDFDownloadLink
          document={<CustomTablePDF data={data} />}
          fileName="table-report.pdf"
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
        {/* </button> */}
      </div>

    )

}

// export default App;
