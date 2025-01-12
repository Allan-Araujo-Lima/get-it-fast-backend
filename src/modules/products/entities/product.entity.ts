import { ProfilesData } from "src/modules/profiles_data/repository/index.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    TableForeignKey,
    ManyToOne
} from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column({ type: "int" })
    amount: number;

    @Column({ type: "date" })
    expiration: Date;

    @ManyToOne(() => ProfilesData, (user) => user.id, { cascade: true, nullable: false })
    user: ProfilesData;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
