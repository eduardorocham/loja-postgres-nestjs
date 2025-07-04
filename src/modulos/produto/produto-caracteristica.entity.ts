import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_caracteristicas' })
export class ProdutoCaracteristicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'produto_id', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  produto: ProdutoEntity;
}
