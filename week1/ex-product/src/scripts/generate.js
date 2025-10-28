import { faker } from '@faker-js/faker';
import fs from 'fs';

const products = [];

for (let i = 1; i <= 1000; i++) {
	const product = {
		id: i,
		name: faker.commerce.productName(),
		price: Number(faker.commerce.price({ min: 5, max: 1000, dec: 2 })),
		description: faker.commerce.productDescription(),
		product: faker.commerce.department(),
		color: faker.color.human(),
		createdAt: faker.date.past().toISOString(),
		image: faker.image.urlPicsumPhotos({ width: 300, height: 300 }),
	};
	products.push(product);
}

fs.writeFileSync('src/database/products.json', JSON.stringify(products, null, 2), 'utf-8');

console.log('Dữ liệu đã tạo');
