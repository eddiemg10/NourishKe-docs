import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import axios from 'axios';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      {/* <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            NourishKe API Tutorial
          </Link>
        </div>
      </div> */}
    </header>
  );
}

const BEARERTOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiZXhwIjoxNzAzMjczMDM1fQ.EMOf1FFHiXZgdhRK5kG8K9VxXN79LBsq4NIBcEaygXg"
const APIKEY = "XX"

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [key_description, setKeyDescription] = useState('')
  const [description_is_empty, setDescriptionFlag] = useState(false)
  const [is_loading_key_generate, setLoadingKeyGenerate] = useState(false)
  const [keys, setKeys] = useState([])
  

  function generateApiKey(){
    setDescriptionFlag(false)
    if(!key_description){
      setDescriptionFlag(true)
      return
    }
    setLoadingKeyGenerate(true)
    axios.get('http://127.0.0.1:8000/api/v1/api-keys',{
      headers:{
        'Authorization': `Bearer ${BEARERTOKEN}`, 
        'X-API-KEY': APIKEY 
      }
    })
      .then(response => {
        setLoadingKeyGenerate(false)
        setKeys(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log(key_description)
  }
 
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/* <HomepageHeader /> */}
      <main>
        {/* <HomepageFeatures /> */}
        <div className="w-full min-h-[100vh]">
          <div className="flex items-center justify-between relative">
            <h1 className="text-3xl p-5">NourishKe API Dashboard</h1>
            <div className="mr-3">Username</div>
          </div>
          
          <div className='w-full flex p-5'>
            <div className='w-[65%] flex flex-col items-center bg-white'>
                <h2 className='text-xl font-semibold text-center py-3'>Your API Keys</h2>

                <table className="table-auto text-xs">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Key</th>
                      <th>Description</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>CX9J**************************gh</td>
                      <td>API Key for the NourishKe App</td>
                      <td>22nd December 2023</td>
                      <td><span className="bg-green-50 text-green-900 border border-green-900 rounded-full px-4 py-1 text-xs">Active</span></td>
                      <td className='flex gap-2'><span className="hover:cursor-pointer rounded-md px-2 py-1 bg-amber-100 hover:bg-amber-200">Revoke</span> <span className="hover:cursor-pointer rounded-md px-2 py-1 bg-red-100 hover:bg-red-200">Delete</span></td>
                    </tr>
                    <tr>
                    <td>2</td>
                      <td>CX9J**************************gh</td>
                      <td>API Key for the NourishKe App</td>
                      <td>22nd December 2023</td>
                      <td><span className="bg-green-50 text-green-900 border border-green-900 rounded-full px-4 py-1 text-xs">Active</span></td>
                      <td className='flex gap-2'><span className="hover:cursor-pointer rounded-md px-2 py-1 bg-amber-100 hover:bg-amber-200">Revoke</span> <span className="hover:cursor-pointer rounded-md px-2 py-1 bg-red-100 hover:bg-red-200">Delete</span></td>

                    </tr>
                    <tr>
                    <td>3</td>
                      <td>CX9J**************************gh</td>
                      <td>API Key for the NourishKe App</td>
                      <td>22nd December 2023</td>
                      <td><span className="bg-red-50 text-red-900 border border-red-900 rounded-full px-4 py-1 text-xs">Revoked</span></td>
                      <td className='flex gap-2'><span className="hover:cursor-pointer rounded-md px-2 py-1 bg-green-100 hover:bg-green-200">Activate</span> <span className="hover:cursor-pointer rounded-md px-2 py-1 bg-red-100 hover:bg-red-200">Delete</span></td>
                    </tr>
                  </tbody>
                </table>

            </div>

            <div className='w-[35%] flex flex-col items-center bg-white mar border-l-2 border-slate-100 min-h-[100vh]'>
              <h2 className='text-xl font-semibold text-center py-3'>Generate API Key</h2>
              <div className='w-full'>
                <div className='px-10 '>
                  <div className='mt-5'>
                    <label className="block mb-2 text-sm text-gray-900"> <span>API Key Description</span> <span className='text-red-500'>*</span> </label>
                    <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"  onChange={e => setKeyDescription(e.target.value)}/>
                  </div>
                    {description_is_empty ? <span className='text-red-500 text-xs'>Description cannot be empty</span> : <></>}
                  { is_loading_key_generate ? 
                    <button disabled type="button" className="text-white bg-slate-400 hover:bg-slate-500 mt-4 py-2 rounded-md bg-slate-900 text-white w-full">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg>
                      Generating...
                    </button>:
                    <button className='mt-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white w-full' onClick={generateApiKey}>Generate</button>
                  }
                </div>
              </div>

              <div>
              {keys.map(k=>(<li key={k.user}>{formatTimestamp(k.createdAt)}</li>))}
            </div>

            </div>

            

          </div>
        </div>
      </main>
    </Layout>
  );
}

function formatTimestamp(timestamp) {
    // Convert timestamp to a Date object
    const date = new Date(timestamp.replace('T', ' ').slice(0, -5)); // Adjust for Python format

    // Extract date and time components
    const dateStr = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }); // Format date as "22 Dec 2023"
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }); // Format time as "09:45"
  
    // Combine and return formatted string
    return `${dateStr} | ${timeStr}`;
}