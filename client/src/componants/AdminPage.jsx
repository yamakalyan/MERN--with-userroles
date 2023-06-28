import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/Helper";

export default function AdminPage() {
  const roleKey = localStorage.getItem("token");
  const [dataListMap, setDataListMap] = useState([]);
  const navigator = useNavigate();
const url = baseUrl
  useEffect(() => {
    const fetchingList = async () => {
      const options = {
        method: "get",
        headers: { "Content-Type": "application/json", KN_HEADER : roleKey },
      };
      await fetch(url + "data/", options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDataListMap(data.dataList);
          } else {
            setDataListMap(data.dataList);
          }
        });
    };
    return () => fetchingList();
  }, []);

  const mappingQuantity = dataListMap?.map((list, l) => {
    const index = l + 1
    return (
      <>
      <tr key={l}>
        <td >{index}</td>
        <td>{list.product_name}</td>
        <td>{list.product_quantity}</td>
        <td>{list.product_price}</td>
        <td>{list.product_size}</td>
        <td>{list.product_description}</td>
      </tr>
      </>
    );
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigator("/");
    window.location.reload(false);
  };

  return (
    <div>
      <div className="container ">
        <div className="text-end">
          <button className="btn btn-primary" onClick={handleLogOut}>
            Log-out
          </button>
        </div>
        <div className="row mt-5">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Size</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
                {mappingQuantity}
            </tbody>
          </table>
        </div>
      </div>

      <span>
        devoloped by{" "}
        <a
          className="mt-5"
          href="https://yamakalyan3120.web.app"
          target="_blanck"
        >
          yama kalyan
        </a>
      </span>
    </div>
  );
}
