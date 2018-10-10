import { SelectQueryBuilder } from 'typeorm';

export default class FilterBuilder<Entity> {
    private selectQueryBuilder: SelectQueryBuilder<Entity>;
    private hasWhere: boolean;

    constructor(selectQueryBuilder: SelectQueryBuilder<Entity>) {
        this.selectQueryBuilder = selectQueryBuilder;
        this.hasWhere = false;
    }

    public getSelectQueryBuilder(): SelectQueryBuilder<Entity> {
        return this.selectQueryBuilder;
    }

    public addFilters(query: object, config: object): void {
        Object.keys(query).map(key => {
            const whereString = `${config[key].column} ${config[key].operator} ${query[key]}`;
            this.addWhere(whereString);
        });
    }

    /**
     * Add a where/andWhere to the SelectQueryBuilder.
     * @param where the string to put in .where(...).
     */
    private addWhere(where: string): void {
        if (!this.hasWhere) {
            this.selectQueryBuilder.where(where);
            this.hasWhere = true;
        } else {
            this.selectQueryBuilder.andWhere(where);
        }
    }

}
