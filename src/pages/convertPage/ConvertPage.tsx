import { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useHistory } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import styles from "./convertpage.module.scss";
import { options } from "../../constants/select-options";
import { ArrowIcon } from "../../components/arrow-icon/ArrowIcon";
import { api } from "../../api";
import {
  ApiResponseCurrencies,
  IConvertResponse,
} from "../../types/response.type";
export const ConvertPage: FC = () => {
  const { push } = useHistory();
  const handleGoHomePageLink = () => {
    push("/");
  };

  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState(options[0]);
  const [currencyTo, setCurrencyTo] = useState(options[1]);

  const handleChangeValueFrom = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return;
    setValueFrom(e.target.value);
  };
  const handleChangeValueTo = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return;
    setValueTo(e.target.value);
  };

  const handleCurrencyFromChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (!selectedOption) return;
    setCurrencyFrom(selectedOption);
  };

  const handleCurrencyToChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (!selectedOption) return;
    setCurrencyTo(selectedOption);
  };
  const handleChangeCurrencyButtonClick = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };
  const fetchData = () => {
    api
      .get<IConvertResponse>(
        `convert?to=${currencyTo.label}&from=${currencyFrom.label}&amount=${valueFrom}`
      )
      .then((d) => setValueTo(String(d.data.result)));
  };
  useEffect(() => {
    if (!valueFrom) return;
    fetchData();
  }, [currencyFrom, currencyTo]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.input_select_wrapper}>
        <Input
          placeholder='Введите сумму...'
          value={valueFrom}
          onChange={handleChangeValueFrom}
        />
        <Select
          options={options}
          onChange={handleCurrencyFromChange}
          defaultValue={options[0]}
          value={currencyFrom}
          isSearchable={false}
        />
      </div>
      <div className={styles.button_wrapper}>
        <Button
          className={styles.convert_button}
          onClick={fetchData}
          disabled={!valueFrom}
        >
          Совершить конвертацию
        </Button>
        <div>
          <Button
            className={styles.change_currencies_button}
            onClick={handleChangeCurrencyButtonClick}
          >
            <ArrowIcon />
          </Button>
        </div>
      </div>
      <div className={styles.input_select_wrapper}>
        <Input
          value={valueTo}
          placeholder='Сумма после конвертации...'
          onChange={handleChangeValueTo}
        />
        <Select
          options={options}
          onChange={handleCurrencyToChange}
          defaultValue={options[1]}
          value={currencyTo}
          isSearchable={false}
        />
      </div>

      <div className={styles.footer_button}>
        <Button onClick={handleGoHomePageLink}>
          Перейти на главную страницу
        </Button>
      </div>
    </div>
  );
};
