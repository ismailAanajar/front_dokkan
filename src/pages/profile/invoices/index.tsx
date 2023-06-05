import React from 'react';

import { Order } from '@dokkan/api/types';
import { Icons } from '@dokkan/assets/icons';
import ProfileLayout from '@dokkan/components/Layouts/ProfileLayout';
import { useAppSelector } from '@dokkan/store';
import { subString } from '@dokkan/utils';
import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

function index() {
  const orders = useAppSelector(state => state.user.userInfo.orders)
  return (
  <ProfileLayout page='invoices' title='My invoices'>
    <PDFViewer>
      <MyDocument order={orders[0]  } />
      </PDFViewer> 
      <section className="mx-auto w-full max-w-7xl px-4 py-4">

  <div className="mt-6 flex flex-col">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray_light md:rounded-lg">
          <table className="min-w-full divide-y divide-gray_light">
            <thead className="bg-gray_light">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Order N</span>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Download
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray_light bg-white">
              {
                orders.map((order:Order) => {
                  return (
                      <tr>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            {order.number}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          {
                            order.total
                          }
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {
                              order.status
                            }
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          <PDFDownloadLink document={<MyDocument order={order}  />} fileName="invoice.pdf">
                            {({ blob, url, loading, error }) =>
                              loading ? 'Loading document...' : <Icons.Download/>
                            }
                          </PDFDownloadLink>
                        </td>
                        
                      </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

  </ProfileLayout>

  )
}

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  logo:{
    width: '200px',
  },
  logoContainer:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  bold:{
    fontWeight: 'bold'
  },
  info:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '30px'
  },
  infoItem:{
    width: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    gap: '30px'
  },
  infoItem_total:{
    width: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    gap: '30px',
    justifyContent: 'flex-end'
  },
  addr:{
    backgroundColor: '#fff',
    padding: 10,
    border: '1px solid #e9e9e9',
    width: '100%',
    fontSize: '12px'
  },
  full:{
    width: '100%'
  },
  prod:{
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  prod_img:{
    width: 50,
    height: 50
  },
  prod_title:{

  },
  prod_price:{
    color: '#eee'
  }

});

// Create Document Component
const MyDocument = ({order}:{order:Order}) => {
  const address = {shipping: order?.shipping_addr, billing: order?.billing_addr}
  return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} src={require('@dokkan/assets/images/logo.png').default.src}/>
      </View>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.bold}>Order N: #</Text>
          <Text>{order.number}</Text>
        </View>
        <View style={styles.infoItem_total}>
          <Text style={styles.bold}>Total: $</Text>
          <Text>{order.number}</Text>
        </View>
        <View style={styles.infoItem}>
          
            {
            Object.keys(address || {}).map(addr => (
             <View style={styles.full}>
              <Text>
                {addr}
              </Text>
              <Text style={styles.addr}>
                
                 
                    {Object.values({...address[addr as  'billing' | 'shipping' ], id: '', isPrimary: ''} ).map(item => item + ' ')}
                 
               </Text>
             </View>
            ))
            
          }
          
        </View>
        
      </View>
      <View style={styles.section}>
        {
            order?.products?.map(product => (
              <View key={product.id} style={styles.prod}>
                <Image src={product.image_url}  style={styles.prod_img}/>
                <View style={styles.prod_title}>
                  <Text>{subString(product.details.product_name, 25)}</Text>
                  <Text style={styles.prod_price}>${product.details.price}x{product.details.quantity}</Text>
                </View>
                <Text>
                  ${
                    product.details.price
                  }
                </Text>
              </View>
            ))
          }  
      </View>
    </Page>
  </Document>
)};

export default index