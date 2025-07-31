import PropTypes from "prop-types";

import { setActiveLayout } from "../../helpers/product";
import style from "./ShopTopActionKingPork.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBraille} from '@fortawesome/free-solid-svg-icons'
// import { faGr} from '@fontawesome/free-light-svg-icons'

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount
}) => {
  return (
    <div className={style["shop-top-bar"]}>
      <div className={style["select-shoing-wrap"]}>
        {/* <div className="shop-select">
          <select
            onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <p>
          Showing {sortedProductCount} of {productCount} result
        </p> */}
      </div>

      <div className={style["shop-tab"]}>
        <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("grid four-column");
            setActiveLayout(e);
          }}
        >

          <FontAwesomeIcon icon={faBraille} />


        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopAction;
