import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChangeEvent } from "react";
import { currencyNameType } from "types";

const formSchema = z.object({
    amount: z.number().positive().multipleOf(0.01),
    currency: z.string(),
});


const CardRow = ({
    amount,
    handleChangeAmount,
    selectedCurrency,
    handleChangeCurrency,
    currencyNames
}: {
    amount: string | undefined;
    handleChangeAmount: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedCurrency: string | undefined;
    handleChangeCurrency: (value: string) => void;
    currencyNames: currencyNameType[] | undefined;
}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: undefined,
            currency: undefined,
        }
    });

    return (
        <div className="flex gap-5">
            <Form {...form}>
                <form className="space-y-8">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="0" 
                                        type="number" 
                                        pattern="[0-9]*" 
                                        value={amount}
                                        onChange={handleChangeAmount}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
                <form className="space-y-8">
                    <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Select 
                                        {...field}
                                        value={selectedCurrency}
                                        onValueChange={handleChangeCurrency}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Currency Name" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                currencyNames?.map((item) => (
                                                    <SelectItem key={item.abw} value={item.abw}> {item.name} </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}

export default CardRow;