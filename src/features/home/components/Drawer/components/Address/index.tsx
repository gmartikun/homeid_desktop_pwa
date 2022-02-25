import { FC, memo, useMemo } from "react";

import { TpUserAddress } from "@src/types";

import addressBg from "../../../../assets/addressBg.png";

import classes from "./style.module.css";

const AddressRaw: FC<AddressProps> = (props) => {
  const { address, number } = props;

  const renderAddress = useMemo(() => {
    const { street, building, city } = address;
    let str = "";

    if (city) {
      str += `г. ${city}, `;
    }

    if (street) {
      str += `ул. ${street}, `;
    }

    if (building) {
      str += `д. ${building}${number ? ", кв. " + number : ""}`;
    }

    return str;
  }, [address, number]);

  return (
    <div className={classes.address}>
      <span>{renderAddress}</span>
      <img className={classes.bgImg} src={addressBg} alt="address" />
    </div>
  );
};

type AddressProps = {
  address: TpUserAddress;
  number: number;
};

export const Address = memo(AddressRaw);
export default Address;
