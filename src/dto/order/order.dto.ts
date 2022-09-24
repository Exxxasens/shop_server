import { CreateOrderDto } from './create.order.dto';
import { OrderProductDto } from './order.product.dto';
import { OrderStatus } from './order.status';

export interface OrderDto extends CreateOrderDto {
    _id: string;
    status: OrderStatus;
    createdAt: number;
    updatedAt: number;
}
