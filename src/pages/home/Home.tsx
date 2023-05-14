import { FC, useEffect, useState } from "react";
import Select from "react-select";
import styles from "./home.module.scss";
import { api } from "../../api";
import { ApiResponseCurrencies } from "../../types/response.type";
import { Loader } from "../../components/loader/Loader";
import { Button } from "../../components/button/Button";
import { useHistory } from "react-router-dom";
import { options } from "../../constants/select-options";

enum ECurrencies {
  USD = "USD",
  EUR = "EUR",
  RUB = "RUB",
}
type TCurrency = {
  value: number;
  code: string;
};

export const Home: FC = () => {
  const { push } = useHistory();

  const [baseCurrency, setBaseCurrency] = useState<ECurrencies>(
    ECurrencies.RUB
  );
  const [currencies, setCurrencies] = useState<TCurrency[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultOption = options.find((option) => option.value === baseCurrency);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCurrencyChange = (selectedOption: any) => {
    setBaseCurrency(selectedOption.value);
  };
  const handleClickNavigateToConvertPage = () => {
    push("/convert");
  };
  const fetchData = () => {
    setIsLoading(true);
    api
      .get<ApiResponseCurrencies>(
        `latest?&base=${baseCurrency}&symbols=EUR,USD,RUB`
      )
      .then((d) => {
        const responseData = d.data.rates;
        const currenciesArray: TCurrency[] = [];
        for (const currencyCode in responseData) {
          const currency = {
            code: currencyCode,
            value: responseData[currencyCode],
          };
          currenciesArray.push(currency);
        }
        setCurrencies(currenciesArray);
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    // fetchData();
    // const intervalId = setInterval(fetchData, 60000);
    // return () => clearInterval(intervalId);
  }, [baseCurrency]);

  return (
    <div className={styles.home_wrapper}>
      <div className={styles.select_wrapper}>
        <Select
          options={options}
          defaultValue={defaultOption}
          onChange={handleCurrencyChange}
        />
        <Button onClick={fetchData}>Обновить</Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        currencies.map((currency) => {
          if (currency.code == baseCurrency) {
            return null;
          } else {
            return (
              <div className={styles.currency} key={currency.code}>
                <span>
                  1 {baseCurrency} = {currency.value} {currency.code}
                </span>
              </div>
            );
          }
        })
      )}
      <div>
        <Button onClick={handleClickNavigateToConvertPage}>
          Перейти на страницу конвертации
        </Button>
      </div>
    </div>
  );
};
