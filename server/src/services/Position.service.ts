import Position, { IPosition } from "../models/Position.model";

class PositionService {
  async createPosition(data: IPosition): Promise<IPosition> {
    try {
      const position = await Position.create(data);
      return position;
    } catch (error: any) {
      throw new Error(`Error creating position: ${error.message}`);
    }
  }

  async getPositionById(positionId: string): Promise<IPosition | null> {
    try {
      const position = await Position.findById(positionId);
      return position;
    } catch (error: any) {
      throw new Error(`Error getting position: ${error.message}`);
    }
  }

  async updatePosition(
    positionId: string,
    data: Partial<IPosition>
  ): Promise<IPosition | null> {
    try {
      const position = await Position.findByIdAndUpdate(positionId, data, {
        new: true,
      });
      return position;
    } catch (error: any) {
      throw new Error(`Error updating position: ${error.message}`);
    }
  }

  async deletePosition(positionId: string): Promise<void> {
    try {
      await Position.findByIdAndDelete(positionId);
    } catch (error: any) {
      throw new Error(`Error deleting position: ${error.message}`);
    }
  }

  async getAllPositions(): Promise<IPosition[]> {
    try {
      const positions = await Position.find();
      return positions;
    } catch (error: any) {
      throw new Error(`Error getting positions: ${error.message}`);
    }
  }
}

export default PositionService;
