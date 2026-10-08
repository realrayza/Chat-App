import { Sidebar } from "./Layout Components/Sidebar";


export const PagesAndSide = ({ children }) => {
  

  return (
    <div className="pagesAndSide flexRow vw100">
      <Sidebar />
      {children}
        
    </div>
  );
};
