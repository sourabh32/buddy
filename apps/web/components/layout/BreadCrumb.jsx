'use client'
 
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const Breadcrumbs = () => {
  const router = usePathname();
  const pathSegments = router.split('/').filter((segment) => segment);

  return (

    <div className="text-sm breadcrumbs">
  <ul>

    {
        pathSegments.map((segment,index)=>{
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const obsolete = segment ==="submissions" || segment ==="candidate"

          if (obsolete) {
            return null;
          }
            return(
                   <li
              key={path}
              className={`breadcrumb-item ${isLast  ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {!isLast ? (
                <Link href={path}>{segment}</Link>
              ) : (
                segment
              )}
            </li>
        )})
    }
  
  </ul>
</div>
    // <nav aria-label="breadcrumb">
    //   <ol className="breadcrumb">
    //     <li className="breadcrumb-item">
    //       <Link href="/">Home</Link>
    //     </li>
    //     {pathSegments.map((segment, index) => {
    //       const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    //       const isLast = index === pathSegments.length - 1;
    //       return (
    //         <li
    //           key={path}
    //           className={`breadcrumb-item ${isLast ? 'active' : ''}`}
    //           aria-current={isLast ? 'page' : undefined}
    //         >
    //           {!isLast ? (
    //             <Link href={path}>{segment}</Link>
    //           ) : (
    //             segment
    //           )}
    //         </li>
    //       );
    //     })}
    //   </ol>
    // </nav>
  );
};

export default Breadcrumbs;
